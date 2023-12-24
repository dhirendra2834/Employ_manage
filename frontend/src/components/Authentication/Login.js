import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Added state for role
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { setUser } = ChatState();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password || !role) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password, role }, // Pass role in the request
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);


      if (role === "admin") {
        history.push("/AdminPage");
      } else if (role === "user") {
        history.push("/chats");
      }
      // console.log(setRole);
      //   history.push("/AdminPage");
     
    
    }
     catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response?.data?.message || "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="role" isRequired>
        <FormLabel>Role</FormLabel>
        <Select value={role} onChange={(e) => setRole(e.target.value)}>
          <option   value="user">User</option>
          <option  value="admin">Admin</option>
          {/* <option  value="admin">{role}</option> */}
        </Select>
      </FormControl>
     
<Button
  colorScheme="blue"
  width="100%"
  marginTop={15} // Use camelCase for style properties
  onClick={submitHandler}
  isLoading={loading}
>
  Login
</Button>

{/* google login  */}

<a href="https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?login_hint&prompt=login&response_type=code&redirect_uri=https%3A%2F%2Flogin.us.auth0.com%2Flogin%2Fcallback&scope=email%20profile&state=Fe26.2**0d80084b27e37875a671f63e3a6d758aa9abddaefff536e33d65227dfd473346*TAVE4u8qqYgW1Vext33KMQ*-DyMEijV8sOwvIYfYbKYPiLD3UTjUXz0g2bMdGoJfWEjd5JSo5C4DPi79KsDZnPrrgqEGoMi0i01UL5fETqf0VWPMCu1y4kHNyQLMeeuDc2g_LG0tKL-LCVUna0Y3QQ5**5939d94e4eff6dc30358da43e1227a66ad09b2502e38fbe219b43af4fd56c8a1*Wwohk_1fnQk1FSL38EjjtVfxwZRJkcNiJdD5HF6O-As&client_id=135034099850-p02kdnahdqi4b1rtd59babpvrgfgpb4o.apps.googleusercontent.com&service=lso&o2v=1&theme=glif&flowName=GeneralOAuthFlow" target="_self">
  <img src="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/image8-2.jpg?width=893&height=600&name=image8-2.jpg" alt="your_image_alt_text_here" width="100px"/>
</a>

{/* microsoft login */}

<a href="https://login.live.com/oauth20_authorize.srf?client_id=bf93a49f-a080-47eb-aa47-dd4547401310&scope=openid+profile+email+https%3a%2f%2fgraph.microsoft.com%2fUser.Read+https%3a%2f%2fgraph.microsoft.com%2fUser.Read&redirect_uri=https%3a%2f%2flogin.us.auth0.com%2flogin%2fcallback&response_type=code&state=Fe26.2**2375d44e3c80ed72e0ab0ae540de97929891a03f837d2db3cb24eac120a2d439*5e4MAjKiURgrJczYy48txw*V7e_ny_Yefl-l51H2_T_qyxwq-mxWKTqysvThirYXCv4LFsdM0pT_6UocIEf1yYjiWvVPtIvWT7IXgwumm4pFEORddVXn4Gmoq0coZTJx38e3XkFiwSc3jlz4fJqKoTJ**13c3200293dc3e150c81cbdd79def46574400d7298b304271fdd3e312ec81d00*jNkyJKhKM9OWoP6_Y4l1GTaZFyqvEVCLcb_m2tmNOOU&prompt=login&uaid=af187bb4e4c64538b1fb8a790b90f613&msproxy=1&issuer=mso&tenant=consumers&ui_locales=en-US&epct=PAQABAAEAAAAmoFfGtYxvRrNriQdPKIZ-79sifYqhWcJsCsnoGZ9rSL4BdIRtUG5a0HUu2cbFsnAktjfozh3rIkYWSX7A3tJCfosf_SfxWfKyiaPUOZlPPPHJtlF5lMKl_E-154U5LTwqEnUzeGCoH3Uu70nLB6G_D4B8UmSXboMVOiwt09qWff2nFByeOgFwuoJvUmK6vNVQa1GGePCsRXE3KvX_QmmStIQNSabQ6EWvMPWZp5eq1iAA&jshs=0#" target="_self">
  <img src="https://logincdn.msauth.net/shared/1.0/content/images/microsoft_logo_564db913a7fa0ca42727161c6d031bef.svg" alt="your_image_alt_text_here" />
</a>
      {/* <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button> */}
    </VStack>
  );
};

export default Login;
