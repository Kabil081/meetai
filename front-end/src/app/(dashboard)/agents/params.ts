import {createLoader, parseAsInteger,parseAsString} from "nuqs/server";
export const useAgentsFilter={
    search:parseAsString.withDefault("").withOptions({clearOnDefault:true}),
    page:parseAsInteger.withDefault(10).withOptions({clearOnDefault:true})
}
export const loadParams=createLoader(useAgentsFilter);