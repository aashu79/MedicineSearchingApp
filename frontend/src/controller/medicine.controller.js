import Request from "./request";

class MedicineService extends Request {
  getAllMedicine = async () => {
    try {
      const response = await this.getRequest("/medicine");
      return response;
    } catch (e) {
      throw e;
    }
  };
  createMedicine = async (token, data) => {
    try {
      const response = await this.postRequest("/medicine", token, data);
      return response;
    } catch (e) {
      throw e;
    }
  };

  updateMedicine = async (token, id, data) => {
    try {
      const response = await this.patchRequest("/medicine/" + id, token, data);
      return response;
    } catch (e) {
      throw e;
    }
  };
  deleteMedicine = async (token, id) => {
    try {
      
      const response = await this.deleteRequest("/medicine/" + id, token);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const MedicineSvc = new MedicineService();
export default MedicineSvc;
