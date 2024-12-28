import moment from "moment";

export default class JobModel{
    static fetchJobs(){
        return jobs;
    }

    static addApplicant(data){
        data.id = applicantIdGen++;
        applicants.push(data);
        --data.jobId;
        jobs[data.jobId].openings--;
        jobs[data.jobId].applicants++;
    }

    static addRecruiter(data){
        data.id = recruiterIdGen++;
        recruiters.push(data);
    }

    static validateLogin(data){
        const matchingRecruiter = recruiters.find(recruiter =>
            recruiter.email === data.email && recruiter.password === data.password
        );
        if(!matchingRecruiter){
            return false;
        } else {
            return true;
        }
    }

    static addNewJob(data){
        const customDate = moment(data.applyByDate);
        data.applyByDate = customDate.format('DD MMM YYYY');
        const currentDate = moment();
        data.postedOnDate = currentDate.format('DD/MM/YYYY');
        data.id = jobIdGen++;
        jobs.push(data);
        return true;
    }

    static getJobDesignationList(){
        return jobDesignationList;
    }

    static getSkillSetList(){
        return skillSetList;
    }
}

const applicants = [];
let applicantIdGen = 1;

const recruiters = [
    {
        name: 'Jayesh',
        email: 'jayeshwarkarthick@gmail.com',
        password: '123'
    }
];
let recruiterIdGen = 1;

const jobs = [
    {
        id: 1,
        companyName: "Coding Ninja",
        role: "SDE",
        location: "Gurgram",
        salary: "14-20lpa",
        skills: ['React', 'NodeJS', 'JS', 'SQL', 'MongoDB', 'Express', 'AWS'],
        applyByDate: "26 Feb 2025",
        openings: 13,
        applicants: 2,
        postedOnDate: "26/12/2024"
    },
    {
        id: 2,
        companyName: "Go Digit",
        role: "Angular Developer",
        location: "Pune",
        salary: "6-10lpa",
        skills: ['Angular', 'JS', 'SQL', 'MongoDB', 'Express', 'AWS'],
        applyByDate: "26 Feb 2025",
        openings: 12,
        applicants: 4,
        postedOnDate: "26/12/2024"
    },
    {
        id: 3,
        companyName: "JusPay",
        role: "SDE",
        location: "Bangalore",
        salary: "20-26lpa",
        skills: ['React', 'NodeJS', 'JS', 'SQL', 'MongoDB', 'Express', 'AWS'],
        applyByDate: "26 Feb 2025",
        openings: 5,
        applicants: 2,
        postedOnDate: "26/12/2024"
    },
    {
        id: 4,
        companyName: "Prodapt",
        role: "Frontend",
        location: "Chennai",
        salary: "4-12lpa",
        skills: ['React', 'JS', 'Bootstrap', 'HTML', 'CSS'],
        applyByDate: "26 Feb 2025",
        openings: 15,
        applicants: 5,
        postedOnDate: "26/12/2024"
    },
    {
        id: 5,
        companyName: "XOXO",
        role: "React Developer",
        location: "Nodia",
        salary: "7-9lpa",
        skills: ['React', 'JS', 'Express', 'TailwindCSS'],
        applyByDate: "26 Feb 2025",
        openings: 5,
        applicants: 2,
        postedOnDate: "26/12/2024"
    },
    {
        id: 6,
        companyName: "PayPal",
        role: "SDE",
        location: "Bangalore",
        salary: "18-22lpa",
        skills: ['React', 'NodeJS', 'JS', 'SQL', 'MongoDB', 'Express', 'AWS'],
        applyByDate: "26 Feb 2025",
        openings: 10,
        applicants: 3,
        postedOnDate: "26/12/2024"
    },
]
let jobIdGen = 7;

const jobDesignationList = ['HR', 'SDE', 'DevOps', 'MERN Developer', 'MEAN Developer', 'JAVA Developer', 'React Developer', 'Angular Developer', 'FullStack Developer', 'FrontEnd Developer', 'BackEnd Developer'];

const skillSetList = ['React', 'NodeJS', 'Angular', 'MongoDB', 'SQL', 'Express', 'JAVA', 'SpringBoot', 'C++', 'DSA'];