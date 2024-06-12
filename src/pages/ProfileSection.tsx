import { useNavigate } from "react-router-dom"
const ProfileSection = () => {
   const navigate = useNavigate()
    const profileImgUrl = "https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aGFwcHklMjBnaXJsfGVufDB8fDB8fHww"

    return(
        <div  onClick={()=>navigate('/profile')}
        className="text-white text-right font-semibold content-center flex flex-cols gap-3 cursor-pointer">
        <div>
          <p>Hello! Jenny</p>
          <p className="font-thin text-sm">@Jenny2024</p>
        </div>
        <div className="bg-white text-center content-center p-1  rounded-full">
          <img
            width={30}
            height={30}
            className="rounded-full w-10 h-10 object-cover	"
            src={profileImgUrl}
          />
        </div>
      </div>
    )
}
export default ProfileSection