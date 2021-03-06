import React from 'react';
import style from './style.scss';
import noneAvatarSVG from './user.svg';

const ChangePicture = () => (
  <div className={style.container}>
    <div className={style.col1}>
      <img src={noneAvatarSVG} alt="noneAvatar" />
    </div>
    <div className={style.col2}>
      <div className={style.col2_1}>Change picture</div>
      <div className={style.col2_2}>Max file size is 20mb</div>
    </div>
    <div className={style.col3}>
      <button type="button">Save</button>
    </div>
  </div>
);

export default ChangePicture;
