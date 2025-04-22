import { Sequelize, QueryTypes } from "sequelize";
import { BaseRepositoryType } from "../../../Architecture";
import PrepareSearch from "../../../Architecture/prepareSearch";
import { CountryDBO } from "../../../DBO";
import { Country } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { ICountryRepository } from "../countryRepository";

export default class CountryRepository extends BaseRepositoryType<CountryDBO, Country> implements ICountryRepository {
  sequelizeDI: IMappsDbModels & { sequelize: Sequelize }
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels & { sequelize: Sequelize } }) {
    super(sequelizeDI.Country);
    this.sequelizeDI = sequelizeDI;
  }


  getCountryByName({ name_fs, transaction }: { name_fs: string, transaction?: number }): Promise<object[]> {

    let freetext = PrepareSearch.simplePrepare(name_fs)
    console.log(freetext);
    let withQuery = [];
    withQuery.push(`countries_prep as
                        (SELECT Countries.* ,
                        0 aS RANK
                        FROM Countries
                        )`);


    withQuery.push(
      `search_fts as (
            SELECT t.* FROM (SELECT 
              [KEY],
              ([RANK])*100/(1+CAST( SUM([RANK]) OVER( PARTITION BY 1) AS FLOAT)) AS [RANK],
			  COUNT(*) OVER() as counter
              FROM 
              CONTAINSTABLE (Countries,  
                name_clob,
                :freetext,
                LANGUAGE '${this.context.language == 'pl' ? 'polish' : 'english'}'
                --	20  
              )  		
			) as t
              WHERE 
			  RANK > 70/(case when counter = 0 then 1
			  else  counter end )
					
          )
        `

    )

    let query = `WITH 
                  ${withQuery.join(',')}
                  SELECT c.id,c.name,c.longitude,c.latitude FROM countries_prep c
                  JOIN  search_fts fs ON c.id= fs.[KEY]
                  ORDER BY fs.RANK DESC ,name`;
    return this.sequelizeDI.sequelize.query(
      query
      ,
      {
        replacements: {
          freetext: freetext
        },
        transaction: this.getTran({ transaction }),
        type: QueryTypes.SELECT
      });

  }
}

export const CountryRepositoryPlugin = {
  pluginName: "country-repository",
  type: 'repository',
  di: 'countryRepositoryDI',
  classType: CountryRepository
};