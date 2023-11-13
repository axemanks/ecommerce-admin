import prismadb from '@/lib/prismadb';
import { CategoryForm } from './components/category-form';
// Dynamic Category page 
// params: { categoryId: string; }
// if a category is found with the id, display the billboard label otherwise create new billboard

const CategoryPage = async ({
    params
}: {
    params: { categoryId: string, storeId: string }
})  => {
    // Fetch category by id
    const category = await prismadb.category.findUnique({
        where: {
            id: params.categoryId
        }
    })

    // Fetch ALL billboards
    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId
        }
    })



    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryForm 
                initialData={category}
                billboards={billboards}
                />
            </div>
        </div>
    )
};

export default CategoryPage;