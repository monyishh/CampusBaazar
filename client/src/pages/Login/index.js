import { Button, Form, Input, message } from "antd";
import FormItem from "antd/es/form/FormItem"; // impor form i8tem component for form structure
import React, { useEffect } from "react"; //used to do effect after operation
import { Link, useNavigate } from "react-router-dom";//used to naviagte to any route
import Divider from "../../components/Divider.js";
import { userLogin } from "../../apicalls/auth.js";
import { useDispatch } from "react-redux";//dispatch diffrenet types of things
import { SetLoader } from "../../redux/loaderSlice.js";

function Login() {
    const navigate = useNavigate();//initialize navigate function for routing
    const dispatch = useDispatch();// Initialize the dispatch function for Redux actions
    const rules = [
        {//rules for form fields
            required: true,
            message: "required",
        },
    ];
    const onFinish = async (value) => {//it is called when the form is submitted
        try {//loader->userLogin check api ->true token set local -> redirect homepage
            dispatch(SetLoader(true));//dispatch action to show loader
            const ret = await userLogin(value);//execution of code pause and show loader untill userLogin function return a value
            dispatch(SetLoader(false));//dispatch action to hide loader
            if (!ret.success) {//if not success return error
                message.error(ret.message);
                return;// return is recommended to prevent unneccery execution of code
            }
            const token = ret.data;
            localStorage.setItem("token", token);
            message.success(ret.message);
            window.location.href = "/";
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    }, []);

    return (
        <div className="h-screen bg-primary flex justify-center items-center">
            <div className="bg-white rounded w-[450px] p-5">
                <h1 className="text-primary text-2xl text-center">LOGIN</h1>
                <Divider />
                <Form layout="vertical" onFinish={onFinish}>
                    <FormItem label="Email" name="email" rules={rules}>
                        <Input placeholder="Email" />
                    </FormItem>
                    <FormItem label="Password" name="password" rules={rules}>
                        <Input placeholder="Password" type="password" />
                    </FormItem>
                    <Button type="primary" block htmlType="submit">
                        Login
                    </Button>
                    <div className="mt-5 text-center">
                        <span className="text-gray-500">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-primary">
                                Register
                            </Link>
                        </span>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Login;
