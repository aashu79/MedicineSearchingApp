import { useForm } from "react-hook-form";
import "./style.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ContactUsSvc from "../../controller/contactUs.controller";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";




const ContactForm = () => {

const navigate = useNavigate();

const contactUsSchema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  number: Yup.string().required().min(10, "Please enter a valid phone number.").max(10, "Please enter a valid phone number."),
  message: Yup.string().required().max(255, "Message cannot exceed 255 characters."),

});
const {register, handleSubmit, formState: {errors}, reset} = useForm({
  resolver: yupResolver(contactUsSchema),
})


const contactUsHanlder = async(data)=>{
  try {
    const response = await ContactUsSvc.createContactUs(null, data);
    reset();
    toast.success("Message sent successfully..We will get back to you soon....");
    
    
  } catch (error) {
    if(error.response.data.error){
      error.response.data.error?.map((data)=>{
        toast.error(data.msg);
      })
    }
    console.error(error);
  }
}
// --------------------ContactUsHdnler the function to be called----------------------??

  return (
    <div className="card">
      <form className="form" onSubmit={handleSubmit(contactUsHanlder)}>
        <div className="group" style={{marginBottom: "8px"}}>
          <input type="text" {...register('name')}/>
          <label htmlFor="name">Name</label>
          {errors && <span style={{color: "red", marginBottom: "3px"}}>{errors?.name?.message}</span>}
        </div>
        <div className="group" style={{marginBottom: "8px"}}>
          <input type="email" id="email" name="email" {...register("email")}/>
          <label htmlFor="email">Email</label>
          {errors && <span style={{color: "red", marginBottom: "3px"}}>{errors?.email?.message}</span>}
        </div>
        <div className="group" style={{marginBottom: "8px"}}>
          <input type="text" id="phone" name="number" {...register("number")}/>
          <label htmlFor="phoneNumber">Phone Number</label>
          {errors && <span style={{color: "red", marginBottom: "3px"}}>{errors?.number?.message}</span>}
        </div>
        <div className="group" style={{marginBottom: "8px"}}>
          <textarea
            placeholder="‎"
            id="message"
            name="message"
            rows="5"
            required=""
            {...register("message")}
          ></textarea>
          <label htmlFor="comment">Message</label>
          {errors && <span style={{color: "red", marginBottom: "3px"}}>{errors?.message?.message}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
