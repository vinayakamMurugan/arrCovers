

export const flatten = (arr) => {
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten)
            ? flatten(toFlatten)
            : toFlatten);
    }, []);
}


export const returnDefaultValue =(array,defaultValue)=>{
   
    let fIndex=-1;
     fIndex=  array.findIndex(x => x.value ===defaultValue);
    if (fIndex === -1)
    {
        fIndex=0;
    }
    return  array[fIndex];
}