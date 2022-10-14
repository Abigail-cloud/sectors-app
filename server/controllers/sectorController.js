import Sector from '../models/Sector.js';
import { StatusCodes } from 'http-status-codes';
import {BadRequestError, NotFoundError, UnAuthenticatedError} from '../errors/index.js'
import checkPermissions  from "../utils/checkPermissions.js";
import mongoose from 'mongoose';
import moment from 'moment'

const createSector = async (req, res) => {
    const { industry, company, position } = req.body;

    if (!industry || !company || !position) {
        throw new BadRequestError('Please provide all values')
    }

    req.body.createdBy = req.user.userId
    const sector = await Sector.create(req.body)
    res.status(StatusCodes.CREATED).json({sector})
}


const getAllSector = async(req, res)=>{

    const { status, jobType, sort, search } = req.query

  const queryObject = {
    createdBy: req.user.userId,
  }
  // add stuff based on condition

  if (status && status !== 'all') {
    queryObject.status = status
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType
  }
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' }
  }
  // NO AWAIT

  let result = Sector.find(queryObject)

  // chain sort conditions

  if (sort === 'latest') {
    result = result.sort('-createdAt')
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt')
  }
  if (sort === 'a-z') {
    result = result.sort('position')
  }
  if (sort === 'z-a') {
    result = result.sort('-position')
  }

  //

  // setup pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const sector = await result

  const totalSectors = await Sector.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalSectors / limit)

  res.status(StatusCodes.OK).json({ sector, totalSectors, numOfPages })
//    const sector = await Sector.find({createdBy: req.user.userId})
//    res.status(StatusCodes.OK).json({sector, totalSector :sector.length, numOfPages:1})
}


const showStats =async (req, res)=>{

    let stats = await Sector.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
        {$group:{_id: '$status', count:{$sum: 1}}},
    ])
//pass in the accumulator and the current item/
    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr;
        acc[title] = count
        return acc
    }, {})

    // 'Healthcare', 'Technology', 'Construction', 'Retail',  'Agriculture', 'Entertainment', 'others'
    const defaultStats = {
        Healthcare: stats.Healthcare || 0,
        Technology: stats.Technology|| 0,
        Construction :stats.Construction || 0,
        Retail: stats.Retail|| 0,
        Agriculture: stats.Agriculture|| 0,
        Entertailnment: stats.Entertainment || 0,
        others: stats.others ||0
    }

    let monthlyApplications = await Sector.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
        {
          $group: {
            _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 6 },
      ])
      monthlyApplications = monthlyApplications
        .map((item) => {
          const {
            _id: { year, month },
            count,
          } = item
          const date = moment()
            .month(month - 1)
            .year(year)
            .format('MMM Y')
          return { date, count }
        })
        .reverse()
    res.status(StatusCodes.OK).json({defaultStats, monthlyApplications})
}


const updateSector =async (req, res)=>{
    const {id:sectorId} =req.params;
    const { industry, company, position } = req.body;
    if (!industry || !company || !position) {
        throw new BadRequestError('Please provide all values')
    }
    
    const sector = await Sector.findOne({ _id: sectorId })
    
    if (!sector) {
        throw new NotFoundError(`No sectoe with id ${sectorId}`)
    }
    //Check for permissions
    checkPermissions(req.user, sector.createdBy)
    const updatedSector = await Sector.findOneAndUpdate({ _id: sectorId }, req.body, {
        new: true,
        runValidators:true
})
    
    res.status(StatusCodes.OK).json({updatedSector})
}


const deleteSector= async(req, res)=>{
    const { id: sectorId } = req.params;
    const sector = await Sector.findOne({ _id: sectorId })
    
    if (!sector) {
        throw new NotFoundError(`No sectoe with id ${sectorId}`)
    }
    checkPermissions(req.user, sector.createdBy)
await sector.remove()
    res.status(StatusCodes.OK).json({msg:'Sucess! Sector Deleted'})
}


export {
    createSector,
    getAllSector,
    showStats,
    updateSector,
    deleteSector,
}