import Request from "./request";

class Search extends Request {
    getMedicine = async(query)=>{
        try{
            const response = await this.getRequest('/medicine?search='+query);
            return response;
        } catch(err){
            throw err;
        }
    }
}

const SearchSvc = new Search();
export default SearchSvc;