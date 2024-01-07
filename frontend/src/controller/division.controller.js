import Request from "./request";

class DivisionService extends Request {
  getAllDivision = async (query) => {
    
    let url = '/division'
    if(query){
      const {companyName, divisionName, areaName} = query;
     if(companyName){
      url = url + '?companyName=' + companyName;
     }
    if(divisionName) {
      url = url + '&divisionName=' + divisionName;
    }if(areaName) {
      url = url + '&areaName=' + areaName;
    }
   
    }
    
    
      try {
      
        const response = await this.getRequest(url);
        return response;
        
      } catch (e) {
        throw e;
      }
    

  };
  createDivision = async (token, data) => {
    try {
      const response = await this.postRequest("/division", token, data);
      return response;
    } catch (e) {
      throw e;
    }
  };

  updateDivision = async (token, id, data) => {
    try {
      const response = await this.patchRequest("/division/" + id, token, data);
      return response;
    } catch (e) {
      throw e;
    }
  };
  deleteDivision = async (token, id) => {
    try {
      
      const response = await this.deleteRequest("/division/" + id, token);
      return response;
    } catch (error) {
      throw error;
    }
  };
  getSingleDivision = async (token, id) => {
    try {
      
      const response = await this.getRequest("/division/" + id, token);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const DivisionSvc = new DivisionService();
export default DivisionSvc;
