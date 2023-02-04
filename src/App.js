import { useQuery } from "react-query";
import { getStudents } from "./services/students.js";
import { getStudent, getPerson } from "./services/student.js";
import { useForm } from "react-hook-form";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./App.css";
import { Button, RadioGroup } from "@mui/material";

function App() {
  const { data, isLoading } = useQuery("students", getStudents);

  return (
    <div>
      <h1>Список студентов</h1>
      { isLoading ? <div>Loading...</div> : <Students data={data} />}
    </div>
  );
}

function Students(props) {
  const { data } = props;
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate("/student/" + id)
  }

  return (
    <React.Fragment>

      {data.map((student) => {
        return (
          <Card sx={{ minWidth: 275 }} key={student.id}>

            <CardContent>
              <h3>{ student.name }</h3>
              <h3>{ student.faculty } в { student.university }</h3>
            </CardContent>

            <CardActions>
              <button size="small" onClick={() => handleClick(student.id)}>More info</button>
            </CardActions>

          </Card>
        );
      })}
    </React.Fragment>
  );
}

export function Student() {
  const { id } = useParams();
  const { data } = useQuery("student", getStudent(id));
  console.log(id);


  return (
    <React.Fragment>
      <h1>Student {data?.student.name}</h1>
      <div className="lili">
        <h2> Information about you    </h2>
        <h3> Faculty: {data?.student.faculty} </h3>
        <h3> University: {data?.student.university} </h3>
        <h3> Degree: {data?.student.degree}, {data?.student.year} year</h3>
        <h3> About yourself:</h3>
        <h3> {data?.student.info}</h3>
      </div>


      <div className="lay">
          <h3 className="social"> VK: {data?.student.vk} </h3>
          <h3 className="social"> Discord: {data?.student.discord} </h3>
          <h3 className="social"> E-mail: {data?.student.email} </h3>
          <h3 className="social"> Telegram: {data?.student.telegram}</h3>
      </div>

    </React.Fragment>
  );
}

export function Authorizations() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm();

  const onSubmit = (data) => {
    console.log("Нет ошибок", data);
  };

  const regSt = () => {
    navigate("/regStudent");
  }
  const reg = () => {
    navigate("/regChild");
  }
  const login = () => {
    navigate("/students");
  }

  return(
    <React.Fragment>
      <div className="reg">
        <div className="layuot">
          <h1>Authorization</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="layuot">

            <div className="lol">
              <input placeholder="Login" {...register("login")}/>
              <input placeholder="Password" {...register("password")}/>
            </div>

            <div className="lol">
              <button onClick={() => login()}>Log in</button>
              <button onClick={() => regSt()}>Register student</button>
              <button onClick={() => reg()}>Register</button> 
            </div>

          </form>
        </div>
      </div>
    </React.Fragment>
  )
}

export function RegistrationSt() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm();

  const onSubmit = (data, e) => {
    const query = Object.entries(data).map((e) => e.join("=")).join("&");
    fetch(`http://localhost:5000/createStudent?${query}`);
    navigate("/personalPage/" + data.login);
  };
  const onError = (errors, e) => console.log(errors, e);
  
  return(
    <React.Fragment>
      <div className="reg">
        <div className="layuot">
          <h1>Registration</h1>
          <form onSubmit={handleSubmit(onSubmit, onError)} className="layuot">
            <div className="lol">
              <input placeholder="Name" {...register("name", { pattern: "/[^a-zA-Z]/g"})}/>
              <input placeholder="Login" {...register("login")}/>
              <input placeholder="Password" {...register("password")}/>
              <input placeholder="E-mail" {...register("email")}/>
              <input placeholder="Faculty" {...register("faculty")}/>
              <input placeholder="Degree" {...register("degree")}/>
              <input placeholder="Year" {...register("year")}/>
              <input placeholder="University" {...register("university")}/>
              <input placeholder="Discord" {...register("discord")}/>        
              <input placeholder="Telegram" {...register("telegram")}/>
              <input placeholder="VK" {...register("vk")}/>
              <input placeholder="Information" {...register("info")}/>
            </div>
            
            <button type="submit">Register</button>
            {formState.errors.name !== undefined && (
                  <div>Not correct name</div>
                )}
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}

export function RegistrationCh() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm();
  
    const onSubmit = (data, e) => {
      const query = Object.entries(data).map((e) => e.join("=")).join("&");
      console.log(query);
      fetch(`http://localhost:5000/createChild?${query}`);
      navigate("/personalPage/" + data.login);
    };

    const onError = (errors, e) => console.log(errors, e);

  
    return(
      <React.Fragment >
        <div className="reg">
          <div className="layuot">
            <h1>Registration</h1>
            <form onSubmit={handleSubmit(onSubmit, onError)} className="layuot">
              <div className="lol">
                <input placeholder="Name" {...register("name", { pattern: "/[^a-zA-Z]/g"})}/>
                <input placeholder="Login" {...register("login")}/>
                <input placeholder="Password" {...register("password")}/>
              </div>
              <button type="submit">Register</button>
              {formState.errors.name !== undefined && (
                    <div>Not correct name</div>
                  )}
            </form>
          </div>
        </div>
      </React.Fragment>
    )
}

export function Timing() {  
  const { login } = useParams();
  const { data, isLoading } = useQuery("students", getPerson(login));

  return (
    <div>
      <h1>Personal Page</h1>
      { isLoading ? <div>Loading...</div> : <PersonalPage data={data} />}
    </div>
);

}

function PersonalPage(props) {
  const { data } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/students")
  }

  return(
    <React.Fragment>
        <div className="lili">
          <h2> Information about you </h2>
          <h3> Faculty: {data.student.faculty} </h3>
          <h3> University: {data.student.university} </h3>
          <h3> Degree: {data.student.degree} </h3>
          <h3> About yourself:</h3>
          <h3> {data.student.info}</h3>
        </div>
        <button onClick={() => handleClick()} className="button2">See students</button>
      

      <div className="lay">
          <h3 className="social"> VK: {data.student.vk} </h3>
          <h3 className="social"> Discord: {data.student.discord} </h3>
          <h3 className="social"> E-mail: {data.student.email} </h3>
          <h3 className="social"> Telegram: {data.student.telegram}</h3>
      </div>
      
      
    </React.Fragment>
  )
}

export default App;
