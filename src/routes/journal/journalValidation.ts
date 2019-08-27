import Joi from "joi";

function validateJournal(createJournal:Express.Request) {
// define joi validation schema for Journal
const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string()
    });
return Joi.validate(createJournal, schema);
}
export {validateJournal};