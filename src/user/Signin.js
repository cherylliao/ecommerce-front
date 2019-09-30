import React, {useState}from 'react'
import Layout from '../core/Layout'
import { Redirect } from 'react-router-dom'
import { signin, authenticate, isAuthenticated } from '../auth'

//import the function from the file


const Signin =() => {

    const [values, setValues] = useState({
        email:"alice@gmail.com",
        password:"dsefeasdd9",
        error: '',
        loading:false,
        redirectToReferrer: false
    });

    const {email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated()

    const handleChange = name => event => {
        setValues({...values, error: false, [name]:event.target.value});

    }
   
    const clickSubmit = (event) => {
        //prevent browser reload when button clicked
        event.preventDefault()
        setValues({...values, error:false, loading: true})
        signin({email, password})
        //data is the json data gotten back
        .then(data =>{
            if(data.error){
                setValues({...values, error: data.error, loading: false})

            } else {
                authenticate(data, () =>{
                    setValues({
                        ...values,
                        redirectToReferrer:true
                    });
                });

            }
        });

    };
    const signUpForm = () => (
        <form>
      
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" 
                value = {email}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" 
                value={password}
                />
            </div>
            <button onClick ={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    
    );

    const showError = () => {
        return(
        <div className="alert alert-danger" style={{display: error ? '':'none'}}>
            {error}
        </div>);
    }
    const showLoading = () => (
        loading && (<div className="alert alert-info"><h2>Loading</h2></div>)
        
        );
    const redirectUser = () => {
        if(redirectToReferrer){
            if(user && user.role ===1){
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
           
        }
        if(isAuthenticated()){
            return <Redirect to="/" />;
        }
    }
    
    return(
    <Layout title="Signin" description="Signin to Node React E-commerce App"
    className="container col-md-8 offset-md-2"
    
    >
        {showLoading()}
        {showError()}
    
           {signUpForm()}
           {redirectUser()}
           
    </Layout>    
    );
};

export default Signin;

