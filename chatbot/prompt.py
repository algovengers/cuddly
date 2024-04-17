import os
from dotenv import load_dotenv
load_dotenv()
from pymongo import MongoClient
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_mongodb import MongoDBAtlasVectorSearch
from langchain_google_genai import GoogleGenerativeAI,ChatGoogleGenerativeAI
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain_community.llms.huggingface_hub import HuggingFaceHub
# from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from flask import Flask, jsonify,request,make_response

app = Flask(__name__)



client = MongoClient(os.getenv('MONGO_URI'))
dbname = "petmodel"
collection_name = "collection_of_text_blobs"
collection= client[dbname][collection_name]

embeddings_model_name = os.environ.get("EMBEDDINGS_MODEL_NAME")

embeddings = HuggingFaceEmbeddings(model_name=embeddings_model_name)

vector_store = MongoDBAtlasVectorSearch(collection=collection,embedding=embeddings,index_name="vector_index")


API_KEY = os.getenv('API_KEY')
HF_API_KEY = os.getenv('HUGGINGFACEHUB_API_TOKEN')


# def build_chain():
#     pass

# chain = build_chain()

prompt_template = """
you are a friendly chatbot called cuddlybot that responds in a conversational
manner to user's questions related to pet care. Respond in short but complete answers unless specifically
asked by the user to elaborate on something. Use History and Context to inform your answers.

Context for cuddlybot : {context}

Question to cuddlybot: {question}


"""
PROMPT = PromptTemplate(
    template=prompt_template, input_variables=["context", "question"]
)
chain_type_kwargs = {"prompt": PROMPT}

def query_data(query):
    # docs = vector_store.similarity_search(query=query)
    # # print(docs)
    # print(len(docs))

    # as_output = docs[0].page_content
    # print(as_output)
    llm= HuggingFaceHub(repo_id="google/flan-t5-large", model_kwargs={"temperature":1e-10})
    # llm= HuggingFaceHub(repo_id="satvikag/chatbot", model_kwargs={"temperature":1e-10})
    llm = GoogleGenerativeAI(model='gemini-pro',google_api_key=API_KEY,temperature=0.9,top_p=0.2)
    # llm = ChatGoogleGenerativeAI(model='gemini-pro',google_api_key=API_KEY,temperature=0.9,top_p=0.2,callbacks=[StreamingStdOutCallbackHandler()])
    # llm = OpenAI(api_key=API_KEY,temperature=0)
    # llm = HuggingFacePipeline.from_model_id(model_id="declare-lab/flan-gpt4all-xl", 
    #                                     task="text2text-generation", 
    #                                     model_kwargs={"temperature":0, "max_length":50, "min_length":10})
    retriever = vector_store.as_retriever()
    qa = RetrievalQA.from_chain_type(llm,chain_type="stuff",retriever=retriever,chain_type_kwargs=chain_type_kwargs)
    retriever_op = qa.invoke(query)

    print(retriever_op)
    return retriever_op

# query_data("My cat is feeling lazy. What should i do?")

@app.route('/',methods=['POST'])
def chat():
    chat = request.form['chat']
    res = query_data(chat)
    response = make_response(res)
    return response

@app.route('/cron',methods=['GET'])
def cron():
    return "hi"

if __name__ == '__main__':
    app.run(host='0.0.0.0')
        