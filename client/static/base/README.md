###合并压缩生成base.js 和base.css

 在`base.json`中定义合并压缩的文件列表和顺序
 
>备注：bootstrap的css引用了自己的fonts 所以需要保证生成的css和font文件的相对路径正确 类似`../fonts/glyphicons-halflings-regular.eot`