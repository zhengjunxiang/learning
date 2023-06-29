const http = require('http')
var multiparty = require('multiparty');
//socket是即时通讯
const path = require('path')
const fse = require('fs-extra');
const { resolve } = require('path');
const { rejects } = require('assert');
const { stringify } = require('querystring');

const server = http.createServer()
const UPLOAD_DIR = path.relative(__dirname, '.', 'chunk')

server.on('request', async(req, res) => {
	// 解决跨域
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Headers', '*')
	res.setHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')

	if (req.url === '/upload') {
		var multipart = new multiparty.Form();

		multipart.parse(req, async function(error, fields, files) {
			if (error) {
				// return
				console.log(error);
			}
			// console.log(fields);
			const [file] = files.file
			const [fileName] = fields.fileName
			const [chunkName] = fields.chunkName
			// console.log(files);

			// 保存切片
			const chunkDir = path.resolve(UPLOAD_DIR, `${fileName}-chunks`)
			if (!fse.existsSync(chunkDir)) {
				await fse.mkdirs(chunkDir)
			}

			// 将切片移入chunkDir
			await fse.move(file.path, `${chunkDir}/${chunkName}`)
			res.end(JSON.stringify({
				code: 0,
				message: '文件上传成功'
			}))
		});


	}

	if(req.url === '/merge'){ // 该去合并切片
		const data=await resolvePost(req)
		const {fileName,size} =data
		const filePath = path.resolve(UPLOAD_DIR,fileName)
		await mergeFileChunk(filePath,fileName,size)
		res.end(JSON.stringify({
			code:0,
			message:'切片合并成'
		}))
	}
})

 async function mergeFileChunk(filePath,fileName,size){
	const chunkDir=path.resolve(UPLOAD_DIR,`${fileName}-chunks`)

	let chunkPaths=await fse.readdir(chunkDir)
	chunkPaths.sort((a,b)=> a.split('-')[1]-b.split('-')[1])

	chunkPaths.map((chunkPath,index)=>{
		return pipeStream(
			path.resolve(chunkDir,chunkPath),
			// 在指定位置创建可写流
			fse.createWriteStream(filePath,{
			
				start:index*size,
				end:(index+1)*size
			})
		)
	})
 }

 function pipeStream(path,writeStream){
	return new Promise(resolve=>{
		const readStream=fse.createReadStream(path)
		readStream.on('end',()=>{
			fse.unlinkSync(path)
			resolve()
		})

		readStream.pipe(writeStream)
	})
 }

function resolvePost(req){
	return new Promise(resolve=>{
		let chunk = ''
		req.on('data',data=>{
			chunk+=data
		})
		req.on('end',()=>{
			resolve(JSON.parse(chunk))
		})
	})
}


server.listen(3000, () => {
	console.log('服务已启动');
})