/* eslint-disable react/prop-types */
import user_img from "../../assets/user.png"
import { useContext, useState } from "react";
import { BiSolidEditAlt, BiDotsHorizontalRounded } from "react-icons/bi";
import { RiVipDiamondFill } from "react-icons/ri";
import { SiginContext } from "../../contexts/SiginContext";
import AuthClientService from "../../servers/Auth.clientService";

function Account({ currentUser, setCurrentUser }) {
  const [checkPassword, setCheckPassword] = useState('')
  const [previewImage, setPreviewImage] = useState([]);
  const { formAccount, setFormAccount, accountMessage, setAccountMessage } = useContext(SiginContext)
  const [isClientId, setIsClientId] = useState(false)

  // 處理照片的格式和密碼資料並存到 formAccount和即時預覽照片
  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (files) { 
      const imageFiles = Array.from(files);
      setFormAccount((prevFormData) => ({
        ...prevFormData,
        // clientImg: imageFiles,
        [name]: imageFiles,
      }));

    // 即時預覽選擇的圖片
    const imagePreviews = imageFiles.map((file) => ({
      file,
      preview:URL.createObjectURL(file)
    }));
      setPreviewImage(imagePreviews);
    } else {
      setFormAccount((prevFormAccount) => ({
        ...prevFormAccount,
        [name]: value,
      }));
    }
  }

   // 刪除預覽的圖片
  const removeImage = (index, ) => {
    setPreviewImage((prevPreviewImage) => {
      const newPreviewImage = [...prevPreviewImage];
      newPreviewImage.splice(index, 1);
      return newPreviewImage;
    });
    // 刪除整個屬性
    delete formAccount.clientImg
  };

  // 消除訊息
  const cancelMessage = () => {
    setTimeout(() => {
      setAccountMessage("")
    },1500)
  }

  // 更新資料
  const sendNewData = async (e) => {
    e.preventDefault() 
    if (formAccount.oldPassword === "" && formAccount.clientImg.length === 0) {
      setAccountMessage("請填寫完整資訊")
      cancelMessage()
      return
    } else if ((formAccount.oldPassword === "" || formAccount.newPassword === "" || checkPassword === "") && formAccount.clientImg.length === 0) {
      setAccountMessage("請填寫完整資訊")
      cancelMessage()
      return
    } else if (formAccount.oldPassword !== "" && (formAccount.newPassword === "" || checkPassword === "")) {
      setAccountMessage("請確認新密碼輸入正確")
      cancelMessage()
      return
    } else if (formAccount.newPassword !== checkPassword) {
      setAccountMessage("請確認新密碼輸入正確")
      cancelMessage()
      return
    } else {
      const data = new FormData()

      if (formAccount.clientImg.length > 0) {
        formAccount.clientImg.forEach((image) => {
          if (typeof (image['name']) !== "string") return
          data.append('images', image, `${image.name}`);
        })
      }
    
      data.append('oldPassword', formAccount.oldPassword);
      data.append('newPassword', formAccount.newPassword);

      // 進行更新
      AuthClientService.updateAccount(currentUser.token, data, currentUser.client_data.public_id)
      .then((res) => {
        if (res.status === 200) {
          setAccountMessage(res.data.message)
          AuthClientService.logout();
          localStorage.setItem("client", JSON.stringify(res.data));
          setCurrentUser(AuthClientService.getCurrentUser());
        }
      })
      .catch((err) => {
        setAccountMessage(err.response.data.message)
      })
      .finally(() => {
        setTimeout(() => {
          setAccountMessage("")
        }, 2000)
      })  
    }

    // 清空密碼和照片的input值
    setFormAccount({
      oldPassword: '',
      newPassword: '',
      clientImg: [],
    })
    setCheckPassword("")
    setPreviewImage([])
  }
  
  // 會員編號的顯示
  const displayClientId = () => {
    setIsClientId(!isClientId)
  }

  const { email, name, vip, images, public_id } = currentUser.client_data
  
  return (
    <section>
      <div className="space-y-6 text-[0.9rem] text-slate-800">
        <div className="flex flex-col space-y-2 border-b py-4">
          { !vip ? 
            <span className="text-emerald-500 text-[1.1rem]">一般會員</span>
          :
            <div className="text-amber-400 flex items-center space-x-2">
              <RiVipDiamondFill size={20}/>
              <span className="text-[1.1rem]">VIP</span>
            </div>
          }
          <div> 
            { images.length < 1 ?
              <img src={user_img} alt="" className="w-24 h-24 border rounded-lg"/> 
              : 
              images.map((item, index) => (
                <div key={index}>
                  <img src={`data:image/jpeg;base64,${item}`}  alt="" className="w-24 h-24 border rounded-lg"/>
                </div>
              )) 
            } 
          </div>
          <div className="flex flex-col">
            <div className=" flex">
              <span>會員編號：</span>
              <div onClick={ displayClientId } className="cursor-pointer ">
                { !isClientId ?
                  <span> <BiDotsHorizontalRounded size={22} color="#6366f1"/> </span>
                  :
                  <span className="text-slate-800/40">sf{ public_id }</span>
                }
              </div>
            </div>
            <div>
              <span>會員帳號：</span> 
              <span>{name}</span>
            </div>
            <div>
              <span>聯絡信箱：</span>
              <span>{email}</span>
            </div>
          </div>
        </div>

        <div>
          <form action="" onSubmit={sendNewData}>
            <div className=" ">
              <div className="space-y-4">
                <div className="flex items-center space-x-10 "> 
                  <span className="text-[1.1rem]">修改資料</span>
                  <div className="flex items-center space-x-4">
                    <button type="submit" className="border rounded-md py-0.5 px-3 btn-success">
                      <BiSolidEditAlt size={18}/>
                    </button>
                    <div>
                      <span className="text-emerald-500 text-base">{ accountMessage }</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-10 md:space-y-0 md:flex md:space-x-36">
                  <div className="space-y-4 w-6/12">
                    <div className="space-y-2">
                      <label className=" text-slate-900" htmlFor="clientImg">更新照片</label>
                      <input className="upload_img_input  md:w-full" type="file"
                        id="clientImg" name="clientImg" accept="image/*" value=''
                        onChange={ handleChange } /> 
                    </div>

                    <div>
                      <div className="overflow-y-auto ">
                        {previewImage.map((item, index) => (
                          <div key={index} className="space-y-2">
                            <img className="border rounded-lg h-32 w-32" src={item.preview} alt="預覽圖片" />
                            <input type="button" value="刪除"
                              className="border rounded-md py-0.4 px-3 btn-delete text-base cursor-pointer"
                              onClick={() => removeImage(index)}
                            />  
                          </div> 
                        ))}
                      </div>
                    </div>  
                  </div>

                  <div className="space-y-2 w-6/12">
                    <div className=""> 
                      <span>更新密碼</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <input id="oldPassword" name="oldPassword" type="password" autoComplete="current-password"
                          placeholder="請輸入舊密碼"
                          value={formAccount.oldPassword}
                          onChange={handleChange}
                          className="border-b focus:outline-none placeholder:text-sm"/>
                      </div>
                      <div className="">
                        <input id="newPassword" name="newPassword" type="password" autoComplete="current-password"
                          placeholder="新密碼請設定8碼英數字"
                          value={formAccount.newPassword}
                          onChange={handleChange}
                          className="border-b focus:outline-none placeholder:text-sm"/>
                      </div>
                      <div className="">
                        <input id="checkPassword" name="checkPassword" type="password" autoComplete="current-password"
                          placeholder="請再輸入一次新密碼"
                          value={checkPassword}
                          onChange={e => setCheckPassword(e.target.value)}
                          className="border-b focus:outline-none placeholder:text-sm"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Account