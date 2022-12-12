import table from 'cakebase';

export default async function handler(req, res) {
    
    if (req.method === 'POST') {
        try{
        const Form_Name = req.body.formname
        const information = req.body.Data
        const Data_Base = table("./users.json");
        const Check_form = await Data_Base.get(obj => obj.formname == Form_Name);

        if(Check_form[0] == undefined || Check_form == []){
            const form_data = await { "Datas": information , "formname": Form_Name}
            await Data_Base.set(form_data);
            res.status(200).json('Your form created please check the forms list')

        }else{
            res.status(200).json('Your form with this name already is exist')
        }

        }
        catch(err){
            console.log(err)
        }
    }
    
}
