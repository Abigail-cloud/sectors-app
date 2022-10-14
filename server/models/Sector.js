import mongoose from 'mongoose';

const SectorSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: [true, 'Please provide company name e.g Google inc.'],
            maxLength: 50
        },
        industry: {
            type: String,
            required: [true, 'Please provide industry category e.g I.T & software'],
            maxLength: 50
        },
        position:{
            type: String,
            required:[true, 'please provide a position']
        },
        status: {
            type: String,
            enum: ['Healthcare', 'Technology', 'Construction', 'Retail',  'Agriculture', 'Entertainment', 'others'],
            default: 'others'
        },
        'Healthcare': { //A property of status
            type: String,
            enum: ['Health information manager', 'Doctor', 'Nurse', 'Medical laboratory scientist', 'Medical physicist', 'Nuclear medicine technologist', 'others'],
        },
        'Technology': {
            type: String,
            enum: ['Software engineer', 'Web Analytics Developer', 'SEO Consultant', 'Content Manager', 'Digital marketing manager', 'Information Architect', 'Data Scientist', 'others']
        },
        'Construction': {
            type: String,
            enum: ['Building services engineers', 'Building surveyors', 'Civil and geotechnical engineers', 'Site managers', 'Landscape architects ', 'Architects and architectural technologists', 'others'],
           
        },
        'Agriculture': {
            type: String,
            enum: ['Agricultural Economist', 'Vet. Doctor', 'Animal Scientist', 'Plant Scientist', 'Precision Agriculture Specialist', 'Bioprocessing Engineer', 'others'],
        },
        'Entertainment': {
            type: String,
            enum: ['Actor', 'Film Crew', 'Choreographer', 'Publicist', 'Photographer', 'Video Editor', 'Producers', 'others'],
        },
        'Retail': {
            type: String,
            enum: ['Sales Associate', 'Cahiers', 'Customer Service Representatives', 'Visual mechandisers', 'Buyers', 'Store managers', 'others'],
        },
        jobType: {
            type:String,
            enum: ['full-time', 'part-time', 'remote', 'internship'],
            default: 'remote'
        },
        jobLocation: {
            type: String,
            default: "City or Country",
            required:true
        },
        createdBy: {
            type: mongoose.Types.ObjectId,                             //linking the user to the sector 
            ref: 'User',
            required: [true, 'Please provide user']
        },
    },
        { timestamps: true }
)

export default mongoose.model('Sector', SectorSchema)