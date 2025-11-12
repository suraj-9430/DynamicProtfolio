import { ModelStatic } from "sequelize";
// import db from "../config/db";
import UserInfo from "../models/userinfo.model";
import WorkExp from "../models/workexprience.model";
import Project from "../models/project.model";
import Certificate from "../models/certificate.model";
import socialmedia from "../models/socialmedia.model";
// import Product from "../models/product.model"; // Example extra table

const models: { [key: string]: ModelStatic<any> } = {
  userinfo: UserInfo,
  workexp: WorkExp,
  project: Project,
  certificate: Certificate,
  socialmedia: socialmedia,
};

export default class CommonService {
  static getModel(tableName: string) {
    const model = models[tableName];
    if (!model) throw new Error(`Model for table "${tableName}" not found`);
    return model;
  }

  static async create(tableName: string, data: object | any) {
    const model = this.getModel(tableName);
    return await model.create(data);
  }

  static async findAll(tableName: string) {
    const model = this.getModel(tableName);
    return await model.findAll();
  }

  static async findById(tableName: string, id: number) {
    const model = this.getModel(tableName);
    return await model.findByPk(id);
  }
  static async findByEmail(tableName: string, email: string) {
    const model = this.getModel(tableName);
    return await model.findOne({
      where: { email: email }
    });
  }
  static async findAllByEmail(tableName: string, email: string) {
    const model = this.getModel(tableName);
    return await model.findAll({
      where: { email: email }
    });
  }
  static async getbySessionToken(tableName: string, SessionToken: string) {
    const model = this.getModel(tableName);
    return await model.findOne({
      where: { SessionToken: SessionToken }
    });
  }
  static async update(tableName: string, id: number, data: object) {
    const model = this.getModel(tableName);
    const record = await model.findByPk(id);
    if (!record) throw new Error("Record not found");
    return await record.update(data);
  }

  static async delete(tableName: string, id: number) {
    const model = this.getModel(tableName);
    const record = await model.findByPk(id);
    if (!record) throw new Error("Record not found");
    return await record.destroy();
  }
}
