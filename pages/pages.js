import Header from "../formTask/header";
import table from 'cakebase';
import PagesStyle from '../formTask/Pages.module.css';
import { VStack } from '@chakra-ui/react';

export default function Pages({links}){
    return(
        <div>
            <Header />
            <VStack spacing='1rem' marginTop='2rem'>
            {links.map(e=>
            <div>
                <a target='_blank' href={`http://localhost:3000/forms/${e.formname}`}>
                    <button className={PagesStyle.linkbutton}>{e.formname}</button>
                </a>
            </div>
            )}
            </VStack>
        </div>
    )
}

export async function getServerSideProps(context) {
    const users = table("./users.json");
    const form = await users.get(obj => { return (true)});
    return {
        props: {links : form}
    }
}