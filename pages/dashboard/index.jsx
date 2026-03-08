import FormationsList from "@/components/dashboard/formations/formations-list";
import Dashboard from "@/components/layouts/dashboardLayout";
import FormationLayout from "@/components/layouts/formationLayout";

export default function Index(){
    return(
        <Dashboard>
            <FormationLayout>
                <FormationsList/>
            </FormationLayout>
        </Dashboard>
    )
}