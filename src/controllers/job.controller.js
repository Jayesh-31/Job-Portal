import { response } from "express";
import JobModel from "../model/job.model.js";

export default class JobController{

    getHomePage(req, res){
        res.render('pages/homePage',{loginStatus: req.loginStatus});
    }
    getJobList(req, res){
        const jobData = JobModel.fetchJobs();
        res.render('pages/jobList', {title: 'jobs', jobs: jobData, loginStatus: req.loginStatus});
    }
    getJobLanding(req, res){
        let jobId = req.params.id;
        jobId--;
        const jobData = JobModel.fetchJobs();
        const job = jobData[jobId];
        res.render('pages/jobLanding',{job: job, loginStatus: req.loginStatus});
    }

    handleApply(req, res){
        const data = req.body;
        data.resumePath = req.file.path;
        JobModel.addApplicant(data);
        return res.send({success: true});
    }

    handleRegister(req, res){
        const data = req.body;
        JobModel.addRecruiter(data);
        res.status(201).send({success: true});
    }

    getLoginPage(req, res){
        return res.render('pages/loginPage', {loginStatus: req.loginStatus});
    }

    handleLogin(req, res){
        const data = req.body;
        const result = JobModel.validateLogin(data);
        if(result){
            req.session.userEmail = data.email;
            return res.status(200).send({success: true});
        } else {
            const errorObj = {
                msg: "Invalid Crendentials, Try Again"
            }
            return res.status(400).send({success: false, response: [errorObj]});
        }
    }

    handleLogout(req, res){
        req.session.destroy((err) => {
            if(err){
                console.log(err);
            } else {
                res.redirect('/login');
            }
        })
    }
}