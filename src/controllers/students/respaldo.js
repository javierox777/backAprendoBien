ctrls.mediaStudents = async(req, res)=>{

    const usuario = await STUDENTS.find()
   

   const arraySessions = await SESSIONS.find()

//regresa todos las id de los estudiantes
   const arrayIdAllStudent = _(usuario).groupBy('_id').map((obj, key) => {return {'_id':key}}).value()
  

   const arrayIdStudentSession = _(arraySessions).groupBy('user').map((obj, key) => {return {'_id':key}}).value()
  

const data3=[];

   _.each(arrayIdStudentSession,function(objeto) {
     
     var elemento_en_data2 = _.find(arrayIdAllStudent,objeto);
    
     if(elemento_en_data2 === undefined) {
        usuario.map(e =>{
            if(e._id == objeto._id){
                console.log("entro esta es ", typeof(objeto._id), objeto._id )
                console.log("entro esta es e  ", typeof(e._id), e._id)
                data3.push(e)
            }
       
    });
     }
     
   });
   
console.log(summed)



   const listauser = {...usuario}
    let summed = _(arraySessions)
       .groupBy('user')
       .map((objs, key) => {
         let a =  _.compact(usuario.map(e=>{
            if(e._id == key || e.id == e.id){
                return e
            }
        }))
         let b={...a}
         
        return {
            'user': b[0]?b[0]: null,
            'result': _.meanBy(objs, c => c.result),
            'timeprom': _.meanBy(objs, c => c.timeprom),
            'correct': _.meanBy(objs, c => c.correct),
            'incorrect': _.meanBy(objs, c => c.incorrect),
            'sessions': objs.length,
        }
    })
    .value();

     
       res.json(summed)
       

}