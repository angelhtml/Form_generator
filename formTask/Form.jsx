import {useForm} from 'react-hook-form';
import { FiDelete } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useState } from 'react';
import FormsStyle from './Forms.module.css';
import axios from 'axios';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    useToast,
    Button,
    Input
} from '@chakra-ui/react';

export default function Form(){
    
  const toast = useToast()
  const router = useRouter()
  const [FormFields, setFormFields] = useState([]);
  const [FormOptions, setFormOptions] = useState([]);
  const { isOpen:Singelisopen, onOpen:Singel, onClose:Singelclose } = useDisclosure()
  const { isOpen:Multiisopen, onOpen:Multi, onClose:Multionclose } = useDisclosure()
  const { isOpen:Selectisopne, onOpen:Select, onClose:Selectonclose } = useDisclosure()
  const { register:singelReg, handleSubmit:singel, formState: { errors:singelerror } } = useForm();
  const { register:multiReg, handleSubmit:multi, formState: { errors:multierror } } = useForm();
  const { register:selectReg, handleSubmit:select, formState: { errors:selecterror } } = useForm();
  const { register:selecAddtReg, handleSubmit:selectAdd, formState: { errors:selectAdderror } } = useForm();
  const { register:FormNameReg, handleSubmit:FormNameAdd, formState: { errors:FormNameerror } } = useForm();

const onSubmitsingle = data => {
const id = Math.floor(Math.random() * 10000);  
setFormFields(current => [...current, {type:"single",id:id, question:data.SingelLineQuestion, pattern:data.SingelLinePattern }]); 
};

const onSubmitMuilty = data => {
const id = Math.floor(Math.random() * 10000);  
setFormFields(current => [...current, {type:"Multi",id:id, question:data.multiLineQuestion, pattern:data.multiLinePattern }]); 
};


const onSubmitOptionAdd = data => {
setFormOptions(current => [...current, data.option ]); 
};


const onSubmitOption = data => {
const id = Math.floor(Math.random() * 10000);  
setFormFields(current => [...current, {type:"option",id:id, question:data.selectLineQuestion, options:FormOptions }]); 
};


const onSubmitFormNameAdd = data => {
  const FormDatas = {
    Data:FormFields ,
    formname:data.FormName
  }
  axios({
    method: 'POST',
    url: '/api/hello',
    data: FormDatas
  }).then(function (response){
    toast({
      title: response.data,
      containerStyle: {
          color : 'blue'
      }
    })
  }).catch(function (err){
    console.log(err)
  })
}

const RemoveInput = (ID)=> {
  const newArr = FormFields.filter(object => {
    return object.id !== ID;
  });
  setFormFields(newArr)
}


    return(
        <div>
        <div className={FormsStyle.formsContainer}>
            <p style={{textAlign:'center'}}>Set Inputs</p>
            <hr style={{color:'deepskyblue',boxShadow:'0 1px 1px 1px deepskyblue'}}/>

            <div className={FormsStyle.formName} >
            <center>
            <span style={{fontSize:'.9rem',textAlign:'center'}}>Your Form Name</span>
            <Input {...FormNameReg("FormName", {required: true, maxLength: 80})} isInvalid errorBorderColor={FormNameerror.FormName ? 'red.300' : 'blue.300' } width='20rem' size='sm'/>
            </center>
            </div>

            <div className={FormsStyle.container}>
                <div className={FormsStyle.formsbox1}><center><button onClick={Singel}>Single line text</button></center></div>
                <div className={FormsStyle.formsbox2}><center><button onClick={Multi}>Multi line text</button></center></div>
                <div className={FormsStyle.formsbox3}><center><button onClick={Select}>Select from a list of options</button></center></div>
            </div>

            <Modal isOpen={Singelisopen} onClose={Singelclose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Single line text</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <span style={{fontSize:'.9rem'}}>please write your question</span>
            <Input {...singelReg("SingelLineQuestion", {required: true, maxLength: 80})} isInvalid errorBorderColor={singelerror.SingelLineQuestion ? 'red.300' : 'blue.300' } type="text"  placeholder='What`s your name?' size='sm' style={{marginBottom:'2rem'}}/>
            <span style={{fontSize:'.9rem'}} >please write your pattern</span>
            <Input {...singelReg("SingelLinePattern", {required: true, maxLength: 80})} isInvalid errorBorderColor={singelerror.SingelLinePattern ? 'red.300' : 'blue.300' } type="text"  placeholder='/^\S+@\S+$/i' size='sm'/>
            </ModalBody>
            <ModalFooter>
              <Button onClick={singel(onSubmitsingle)} colorScheme='twitter' size='sm'>Submit</Button>
            </ModalFooter>
            </ModalContent>
            </Modal>

            <Modal isOpen={Selectisopne} onClose={()=>{ setFormOptions([]);   Selectonclose();}}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Select from a list of options</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <span style={{fontSize:'.9rem'}}>Please write your question</span>
            <Input {...selectReg("selectLineQuestion", {required: true, maxLength: 80})} isInvalid errorBorderColor={selecterror.selectLineQuestion ? 'red.300' : 'blue.300' } type="text"  placeholder='Select your country' size='sm' style={{marginBottom:'2rem'}}/>
            <span style={{fontSize:'.9rem'}}>Please write your options</span>
            <Input {...selecAddtReg("option", {required: true, maxLength: 80})} isInvalid errorBorderColor={selectAdderror.option ? 'red.300' : 'blue.300' } type="text"  placeholder='A' size='sm'/>
            <select key={FormOptions} placeholder='Select option' className="class">
              {FormOptions.map(e=>{ return( <option value={e} >{e}</option>)}) }
            </select>
            </ModalBody>
            <ModalFooter>
            <Button onClick={select(onSubmitOption)} colorScheme='twitter' size='sm' style={{marginRight:'1rem'}}>Submit</Button>
            <Button  onClick={selectAdd(onSubmitOptionAdd)} colorScheme='twitter' size='sm'>Add Option</Button>
            </ModalFooter>
            </ModalContent>
            </Modal>

            <Modal isOpen={Multiisopen} onClose={Multionclose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Multi line text</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <span style={{fontSize:'.9rem'}}>Please write your question</span>
            <Input {...multiReg("multiLineQuestion", {required: true, maxLength: 80})} isInvalid errorBorderColor={multierror.multiLineQuestion ? 'red.300' : 'blue.300' } type="text"  placeholder='Tell about your experiences' size='sm' style={{marginBottom:'2rem'}}/>
            <span style={{fontSize:'.9rem'}}>Please write your pattern</span>
            <Input {...multiReg("multiLinePattern", {required: true, maxLength: 80})} isInvalid errorBorderColor={multierror.multiLinePattern ? 'red.300' : 'blue.300' } type="text"  placeholder='/^\S+@\S+$/i' size='sm' />
            </ModalBody>
            <ModalFooter>
            <Button onClick={multi(onSubmitMuilty)} colorScheme='twitter' size='sm'>Submit</Button>
            </ModalFooter>
            </ModalContent>
            </Modal>

            <p style={{textAlign:'center',marginTop:'2rem'}}>Preview</p>
            <hr style={{color:'deepskyblue',boxShadow:'0 1px 1px 1px deepskyblue'}}/>

            <div className={FormsStyle.userformsbox}>
            {FormFields.map(e=>{  
            if(e.type==="single"){return( <div className={FormsStyle.userforms} key={e.id}><div className={FormsStyle.inputGroup}><span>{e.question}</span><Input isInvalid errorBorderColor='deepskyblue' placeholder={e.question}/><FiDelete onClick={() => RemoveInput(e.id)} className={FormsStyle.removeIcon}/></div></div>)}
            
            if(e.type==="Multi"){return( <div className={FormsStyle.userforms} key={e.id}><div className={FormsStyle.inputGroup}><span>{e.question}</span><textarea placeholder={e.question} style={{border:"2px solid deepskyblue"}}/><FiDelete onClick={() => RemoveInput(e.id)} className={FormsStyle.removeIcon}/></div></div>)}
            
            if(e.type==="option"){return( 
            <div className={FormsStyle.userformsbox} key={e.id}>
              <div className={FormsStyle.inputGroup}>
              <span>{e.question}</span>
              <select className={FormsStyle.userformsSelect} placeholder={e.question}>
              {e.options.map(x=><option value={x} >{x}</option>)}
              </select>
              <FiDelete onClick={() => RemoveInput(e.id)} className={FormsStyle.removeIcon}/>
              </div>
            </div>
            )}
            })
            }
            </div>

            <center>
              <button onClick={FormNameAdd(onSubmitFormNameAdd)} className={FormsStyle.submitbutton} style={{marginBottom:"2rem"}}>Submit</button>
              <button  type="button" className={FormsStyle.submitbutton} style={{marginBottom:"2rem"}} onClick={() => router.push('/pages')}>Forms List</button>
            </center>

        </div>
        </div>
    )
}
