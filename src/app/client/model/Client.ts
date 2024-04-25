export class Client {

    public email: string;
    public phone: number;
    public shared_key: string
    public bussines_id: string
    public date_added: Date;


    constructor(email: string, phone: number, shared_key: string, bussines_id: string, date_added: Date) {
        this.email = email;
        this.phone = phone;
        this.shared_key = shared_key;
        this.bussines_id = bussines_id;
        this.date_added = date_added;
    }



}
