import {parseAsInteger,useQueryStates,parseAsString} from "nuqs";
export const useAgentsFilter=()=>{
    return useQueryStates({
        search:parseAsString.withDefault("").withOptions({clearOnDefault:true}),
        page:parseAsInteger.withDefault(10).withOptions({clearOnDefault:true})
    })
}