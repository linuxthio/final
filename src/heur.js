

export const heur=(second) =>{
    
    let d=new Date(second*1000)
    let h=d.toString().split(" ")[4]
    // h=d.toString()
    return h
}


// c=console.log
// c(heur(1699859394))

// heur(1699900697)

