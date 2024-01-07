import Request from "./request";

class CompanyService extends Request {
  getAllCompany = async () => {
    try {
      const response = await this.getRequest("/company");
      return response;
    } catch (e) {
      throw e;
    }
  };
  createCompany = async (token, data) => {
    try {
      const response = await this.postRequest("/company", token, data);
      return response;
    } catch (e) {
      throw e;
    }
  };

  updateCompany = async (token, id, data) => {
    try {
      const response = await this.patchRequest("/company/" + id, token, data);
      return response;
    } catch (e) {
      throw e;
    }
  };
  deleteCompany = async (token, id) => {
    try {
      
      const response = await this.deleteRequest("/company/" + id, token);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const CompanySvc = new CompanyService();
export default CompanySvc;
