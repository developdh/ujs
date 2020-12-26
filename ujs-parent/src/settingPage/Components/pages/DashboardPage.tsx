import React from 'react';
import {Properties as css} from 'csstype';
import { fontFamily } from '@material-ui/system';


const DashboardPage = () => {
    const divStyle:css = {
        padding: "10px",
        fontFamily: "sans-serif"
    }
    return (
        <div style={divStyle}>
            <h1>UJS 1.0.0</h1>

            <h2>How to use UJS</h2>
            <p>UJS 예제를 킨다면, UJS에서 "당신의 시스템에서 ujs코드를 실행하려고 합니다. 실행하겠습니까?" 라는 다이얼로그가 뜹니다. 이 때 Yes 를 누르면 Setting페이지에 정보가 등록되고, UJS코드가 실행됩니다.</p>
            <p>Setting페이지에 정보가 등록되면, 디렉토리, 디펜던시, 포트를 추가 할 수 있습니다. 각각 Directory, Dependency, Port 밑에 정보를 입력하고, +버튼을 클릭하면 등록됩니다. 디렉토리와 포트는 추가 후 삭제 할 수 있지만, 디펜던시는 한 번 추가하면 삭제 할 수 없습니다.</p>
            <p>Directory는 ujs를 사용하는 페이지에서 접근할 수 있는 폴더를 의미합니다. ujs를 사용하는 앱에서는 이런 폴더의 실제 주소를 알아낼 수 있습니다.(도커 포함)</p>
            <p>Dependency는 ujs 앱이 컴퓨터에서 사용할 수 있는 node 모듈을 의미합니다. node 버전에서만 사용됩니다.</p>
            <p>Port는 ujs가 호스트 컴퓨터에서 점유할 포트를 의미합니다. Docker 버전에서만 사용됩니다.</p>   
        </div>
    );
};

export default DashboardPage;