import Request from "./request";

class ContactUsService extends Request {
  getAllContactUs = async (token) => {
    try {
      const response = await this.getRequest("/contact", token);
      return response;
    } catch (e) {
      throw e;
    }
  };
  createContactUs = async (token, data) => {
    try {
      const response = await this.postRequest("/contact",null, data);
      return response;
    } catch (e) {
      throw e;
    }
  };


  deleteContactUs = async (token, id) => {
    try {
      
      const response = await this.deleteRequest("/contact/" + id, token);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const ContactUsSvc = new ContactUsService();
export default ContactUsSvc;
