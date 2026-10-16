export class DB_MANAGER {
    constructor() {
        this.DATABASES_DIRECTORY = "dbs";
        this.CURRENT_DATABASE = "main_db.json";
        this.DATABASE_PATH = `${this.DATABASES_DIRECTORY}/${this.CURRENT_DATABASE}`;

        this.CURRENT_DATABASE_DATA = {};
    }

    async readCurrentDatabase() {
        try {
            const response = await fetch(this.DATABASE_PATH);
            if (!response.ok) { throw new Error(`HTTP Error ! Status : ${response.status}`); }

            const data = await response.json();
            this.CURRENT_DATABASE_DATA = data;
            
            console.log("DB Manager - Database loaded !", this.CURRENT_DATABASE_DATA);

        } catch (err) {
            console.error("Cannot Load Database:", err);
            this.CURRENT_DATABASE_DATA = {};
        }
    }

    async getData(dataToGetPath = ".") {
        await this.readCurrentDatabase();
        if (dataToGetPath == ".") { return this.CURRENT_DATABASE_DATA }

        let path = dataToGetPath.split(".");
        let lastElement = path.pop();
        console.log(`Try to fetch data from path '${path}'`);

        let outputData = null;
        let currentData = this.CURRENT_DATABASE_DATA;
        path.forEach(element => {
            if (element in currentData) { currentData = currentData[element]; }
        });
        if (lastElement in currentData) { outputData = currentData[lastElement]; }

        return outputData
    }
}

export const DB_MANAGER_INSTANCE = new DB_MANAGER();