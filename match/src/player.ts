export default class Player {
    gender: Gender;
    preference: Gender;
    responses: any[];

    constructor(gender: Gender, preference: Gender, responses: any[]) {
        this.gender = gender;
        this.preference = preference;
        this.responses = responses;
    }
}

export enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other'
}