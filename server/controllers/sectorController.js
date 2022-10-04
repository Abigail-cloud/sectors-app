



const createSector = async(req, res)=>{
    res.send('create')
}


const getAllSector = async(req, res)=>{
    res.send('getall')
}


const showStats =async (req, res)=>{
    res.send('stats')
}

const bookSector =async (req, res)=>{
    res.send('books')
}


const updateSector =async (req, res)=>{
    res.send('update')
}


const deleteSector= async(req, res)=>{
    res.send('delete')
}


export {
    createSector,
    getAllSector,
    showStats,
    updateSector,
    deleteSector,
    bookSector
}