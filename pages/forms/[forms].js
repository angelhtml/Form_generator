import table from 'cakebase';
import FormsStyle from '../../formTask/Forms.module.css';
import { Input, useToast  } from '@chakra-ui/react';
import Headeruser from '../../formTask/Headeruser';

export default function Userform({data}){
    const toast = useToast()
    return(
        <div>
            <Headeruser title={data[0].formname}/>
            <div className={FormsStyle.userformsbox}>
            {data[0].Datas.map(e=>{  
            if(e.type==="single"){return( <div className={FormsStyle.userforms} key={e.id}><div className={FormsStyle.inputGroup}><span>{e.question}</span><Input isInvalid errorBorderColor='deepskyblue' placeholder={e.question}/></div></div>)}
            
            if(e.type==="Multi"){return( <div className={FormsStyle.userforms} key={e.id}><div className={FormsStyle.inputGroup}><span>{e.question}</span><textarea placeholder={e.question} style={{border:"2px solid deepskyblue"}}/></div></div>)}
            
            if(e.type==="option"){return( 
            <div className={FormsStyle.userformsbox} key={e.id}>
              <div className={FormsStyle.inputGroup}>
              <span>{e.question}</span>
              <select className={FormsStyle.userformsSelect} placeholder={e.question}>
              {e.options.map(x=><option value={x} >{x}</option>)}
              </select>
              </div>
            </div>
            )}
            }) 
            }

            <center>
                <button  onClick={() => {
                toast({
                    title: 'Thank you for your submit',
                    containerStyle: {
                        color : 'blue'
                    }
                  })
            }} 
            className={FormsStyle.submitbutton} 
            style={{margin:"2rem"}}>Submit</button>
            </center>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const users = table("./users.json");
    const form = await users.get(obj => obj.formname === context.params.forms); 
    return {
        props: {data : form}
    }
}
