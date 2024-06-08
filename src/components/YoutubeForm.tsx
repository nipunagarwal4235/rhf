import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormData = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
};

const YoutubeForm = () => {
  const form = useForm<FormData>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div>
      <h1>YouTube Form</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: { value: true, message: "Username is required" },
            })}
          />

          <p className="error">{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter a different email address"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("yahoo.com") ||
                    "Enter a different email address"
                  );
                },
              },
            })}
          />

          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", { required: "Username is required" })}
          />

          <p className="error"> {errors.channel?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input type="text" id="twitter" {...register("social.twitter")} />
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input type="text" id="facebook" {...register("social.facebook")} />
        </div>

        <div className="form-control">
          <label htmlFor="primary-phonenumber">Primary Phone Number</label>
          <input
            type="text"
            id="primary-phonenumber"
            {...register("phoneNumbers.0")}
          />

          <p className="error">{errors.phoneNumbers?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="secondary-phonenumber">Secondary Phone Number</label>
          <input
            type="text"
            id="secondary-phonenumber"
            {...register("phoneNumbers.1")}
          />
        </div>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
