export const getFilterProducts = (data)=>{
    const filterData = []
     data.map(i=> filterData.push(i.product))
    return filterData
}