import os
from dotenv import load_dotenv
load_dotenv()
from pymongo import MongoClient
# from langchain_google_vertexai import VertexAIEmbeddings
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.document_loaders import DirectoryLoader,PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_mongodb import MongoDBAtlasVectorSearch
# from sentence_transformers import SentenceTransformer


loader = DirectoryLoader('./files',glob='./*.pdf',loader_cls=PyPDFLoader)
documents = loader.load()

print(len(documents))


text_splitter = RecursiveCharacterTextSplitter(
                                               chunk_size=1000, 
                                               chunk_overlap=200)

texts = text_splitter.split_documents(documents)
print(len(texts))
# print(os.getenv('MONGO_URI'))

client = MongoClient(os.getenv('MONGO_URI'))
dbname = "petmodel"
collection_name = "collection_of_text_blobs"
collection= client[dbname][collection_name]


embeddings_model_name = os.environ.get("EMBEDDINGS_MODEL_NAME")


embeddings = HuggingFaceEmbeddings(model_name="intfloat/multilingual-e5-large",
                                       model_kwargs={'device': 'cpu'})

vector_store =  MongoDBAtlasVectorSearch.from_documents(
documents=documents, embedding=embeddings, collection=collection)

