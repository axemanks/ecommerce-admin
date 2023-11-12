import prismadb from '@/lib/prismadb';
import { BillboardForm } from './components/billboard-form';
// Dynamic Billboard page 
// params: { billboardId: string; }
// if a billboard is found with the id, display the billboard label otherwise create new billboard

const BillboardPage = async ({
    params
}: {
    params: { billboardId: string; }
})  => {
    // Fetch billboard by id
    const billboard = await prismadb.billboard.findUnique({
        where: {
            id: params.billboardId
        }
    })



    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardForm initialData={billboard}/>
            </div>
        </div>
    )
};

export default BillboardPage;