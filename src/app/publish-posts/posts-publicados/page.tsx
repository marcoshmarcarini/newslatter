import ListPosts from "@/components/Admin/ListPosts/page";
import AdminNav from "@/components/theme/AdminNav/page";


export default function PostsPublicados() {
    return (
        <div className={`flex gap-5`}>
            <AdminNav />
            <ListPosts />
        </div>
    )
}