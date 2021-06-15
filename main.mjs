import {App} from "./src/main/js/App.mjs";
import {DatabaseManagerService} from "./src/main/js/DatabaseManagerService.mjs";

(async () => {
    // await new App().startUp()
    const service = await new DatabaseManagerService().startUp()
    const professors = await service.getAllProfessors();
    console.log(professors);
    await service.close()
})()
