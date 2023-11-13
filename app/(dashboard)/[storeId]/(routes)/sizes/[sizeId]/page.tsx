import prismadb from '@/lib/prismadb';
import { SizeForm } from './components/size-form';
// Dynamic Category page 
// params: { sizeId: string; }
// if a size is found with the id, display the billboard label otherwise create new billboard

const SizePage = async ({
    params
}: {
    params: { sizeId: string, storeId: string }
})  => {
    // Fetch size by id
    const size = await prismadb.size.findUnique({
        where: {
            id: params.sizeId
        }
    })




    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeForm 
                initialData={size}
                />
            </div>
        </div>
    )
};

export default SizePage;