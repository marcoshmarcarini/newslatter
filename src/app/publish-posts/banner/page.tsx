import SetBanner from "@/components/SetBanner/page";
import AdminNav from "@/components/theme/AdminNav/page";

export default function Banner(){
    return(
        <div className={`flex gap-5`}>
            <AdminNav />
            <SetBanner />
        </div>
    )
}