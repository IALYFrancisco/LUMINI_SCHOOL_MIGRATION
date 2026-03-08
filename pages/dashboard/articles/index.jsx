import ArticlesList from "@/components/dashboard/articles/article-list";
import Dashboard from "@/components/layouts/dashboardLayout";
import ArticleLayout from "@/components/layouts/articleLayout";

export default function Index(){
    return(
        <Dashboard>
            <ArticleLayout>
                <ArticlesList/>
            </ArticleLayout>
        </Dashboard>
    )
}