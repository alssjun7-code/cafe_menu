const express = require('express');
const mysql = require('mysql2');

const app = express();

// EJS 설정
app.set('view engine', 'ejs');

// MySQL 연결
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jjun0708!@',
    database: 'cafe_db',
	port: 3306
});

// DB 연결 확인
db.connect((err) => {
    if (err) {
        console.error('DB 연결 실패:', err);
        return;
    }

    console.log('MySQL 연결 성공!');
});

// 메뉴 조회
app.get('/', (req, res) => {

    const sql = 'SELECT * FROM menus ORDER BY id ASC';

    db.query(sql, (err, results) => {

        if (err) {
            console.error(err);
            return res.status(500).send('데이터 조회 실패');
        }

        res.render('index', {
            menus: results
        });

    });

});

// 서버 실행
app.listen(3000, () => {
    console.log('서버 실행: http://localhost:3000');
});
