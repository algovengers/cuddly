import os
import time
from dotenv import load_dotenv
load_dotenv()
from pymongo import MongoClient
from langchain_community.embeddings import HuggingFaceInferenceAPIEmbeddings
from langchain_mongodb import MongoDBAtlasVectorSearch
from langchain_google_genai import GoogleGenerativeAI,ChatGoogleGenerativeAI
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain_community.llms.huggingface_hub import HuggingFaceHub
# from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from flask import Flask, jsonify,request,make_response
from flask_cors import CORS, cross_origin
from pinecone import Pinecone, ServerlessSpec
from langchain_pinecone import PineconeVectorStore
from langchain_core.documents import Document

app = Flask(__name__)
CORS(app, support_credentials=True)



embeddings_model_name = os.environ.get("EMBEDDINGS_MODEL_NAME")
HF_API_KEY = os.getenv('HUGGINGFACEHUB_API_TOKEN')
API_KEY = os.getenv('GOOGLE_API_KEY')
index_name = os.getenv('PINCONE_INDEX')

pinecone_api_key=os.getenv('PINECONE_API_KEY')
pc = Pinecone(api_key=pinecone_api_key)


index = pc.Index(index_name)

embeddings = HuggingFaceInferenceAPIEmbeddings(api_key=HF_API_KEY,model_name=embeddings_model_name)

vector_store = PineconeVectorStore(index=index, embedding=embeddings)

llm = ChatGoogleGenerativeAI(model='gemini-pro',api_key=API_KEY,temperature=0.9,top_p=0.2)
retriever = vector_store.as_retriever()

def generate_prompt(question,context):
    prompt_template = f"""
You are a friendly chatbot called cuddlybot that responds in a conversational
manner to user's questions related to pet care. Respond in short but complete answers unless specifically
asked by the user to elaborate on something. Use History and Context to inform your answers.
If the question is related to pets then you may add a bit of your knowledge too, but don't 
oppose the context ever.
You should never return an empty response, of the given prompt, you'll always have to answer something.

Context for cuddlybot : {context}

Question to cuddlybot: {question}
"""
    return prompt_template

def process_content(retriever_op: list[Document]):
    context = ""
    for i in retriever_op:
        context = context + i.page_content + "\n"
    return context


def query_data(query):
    start_time = time.time()
    retriever_op = retriever.invoke(query)
    print("Time taken by pinecone to fetch simlar results",time.time() - start_time)
    start_time = time.time()
    if len(retriever_op) == 0:
        return ""
    context = process_content(retriever_op=retriever_op)
    response  = llm.invoke(input=generate_prompt(query,context))
    print("Time taken by gemini to generate response",time.time() - start_time)

    return response.content


@app.route('/',methods=['POST'])
@cross_origin(supports_credentials=True)
def chat():
    if request.method == 'POST':
        print(request.data)
        chat_data = request.json
        chat = chat_data.get('chat')  # Extracting chat message from JSON
        res = query_data(chat)
        response = make_response({
            "query": chat,
            "result": res
        })
        return response

@app.route('/cron',methods=['GET'])
@cross_origin(supports_credentials=True)
def cron():
    return "hi"

if __name__ == '__main__':
    app.run(host='0.0.0.0')
        