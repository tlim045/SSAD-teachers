import ViewQuestions from "./ViewQuestions";
import mockAxios from "../mocks/axios";



it("Test retrieval of questions", async () => {
    // set up mock Axios data retrieval
    mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
            data:{
                Question: ["test question"]
            }
        })
    );

});