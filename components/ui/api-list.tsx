// lists the api routes for billboards
"use client"

import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { ApiAlert } from "./api-alert";

interface ApiListProps {
    entityName: string;
    entityIdName: string;
};

export const ApiList: React.FC<ApiListProps> = ({
    entityName,
    entityIdName,
}) => {
    const params = useParams();
    const orgin = useOrigin();

    const baseUrl = `${orgin}/api/${params.storeId}`



    return (
        <>
        <ApiAlert 
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
        />
        <ApiAlert 
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        />
        <ApiAlert 
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
        />
        <ApiAlert 
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        />
        <ApiAlert 
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        />        
        </>
    )
};
export default ApiList;