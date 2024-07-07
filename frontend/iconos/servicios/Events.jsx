import {useState,useEffect} from 'react';
function Event({setNombreServicio,className}) {
  useEffect(()=>{
    setNombreServicio && setNombreServicio("Celebracines y Eventos");
  },[])
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      className={className}
    >
      <path d="M211.784 853.108a7.994 7.994 0 01-5.654-13.65L421.476 624.14c37.546-37.562 52.056-82.214 68.862-133.928 22.32-68.642 47.606-146.456 134.522-227.608 3.202-3.032 8.28-2.852 11.292.382a7.988 7.988 0 01-.39 11.298c-83.886 78.342-108.502 154.06-130.21 220.87-16.712 51.44-32.502 100.028-72.766 140.292l-215.348 215.32a7.98 7.98 0 01-5.654 2.342zM13.868 647.194L2.56 635.888 217.876 420.54c40.264-40.282 88.87-56.078 140.3-72.798 66.8-21.708 142.518-46.324 220.86-130.204 3.03-3.208 8.106-3.396 11.292-.38a7.986 7.986 0 01.388 11.298c-81.152 86.892-158.948 112.188-227.59 134.498-51.712 16.814-96.382 31.33-133.944 68.892L13.868 647.194z"></path>
      <path d="M211.784 853.108a7.98 7.98 0 01-5.654-2.342L2.558 647.194a7.992 7.992 0 010-11.306 7.994 7.994 0 0111.308 0l203.57 203.57a7.994 7.994 0 01-5.652 13.65zM224.2 717.382h-.016c-22.178-.016-46.184-3.936-71.314-11.668a7.964 7.964 0 01-5.294-5.262c-52.62-169.524 88.478-218.736 89.916-219.212a7.9 7.9 0 017.528 1.342 7.99 7.99 0 012.952 7.06c-1.576 15.252 1 26.714 7.624 34.072 8.292 9.2 22.318 11.12 32.626 11.12 12.556 0 23.146-2.794 23.256-2.81a7.984 7.984 0 019.792 9.792c-.078.344-8.934 34.14 4.982 52.29 7.184 9.34 19.178 13.042 37.328 11.184 2.796-.344 5.356.828 7.06 2.938a7.99 7.99 0 011.36 7.528c-.346 1.014-34.972 101.626-147.8 101.626zm-62.582-25.722c22.13 6.45 43.168 9.714 62.568 9.73 79.84 0 115.966-55.602 127.884-79.716-17.008-.656-29.958-6.67-38.532-17.884-12.588-16.43-11.932-39.888-10.028-54.024a114.648 114.648 0 01-15.29 1.062c-19.43 0-34.814-5.67-44.498-16.398-7.558-8.374-11.604-19.57-12.134-33.4-29.864 14.4-107.034 64.902-69.97 190.63zm474.268-409.656a7.972 7.972 0 01-5.654-2.344L573.6 223.042a7.992 7.992 0 010-11.306 7.994 7.994 0 0111.308 0l56.632 56.618a7.992 7.992 0 010 11.306 7.972 7.972 0 01-5.654 2.344z"></path>
      <path d="M584.94 231.088a7.972 7.972 0 01-5.654-2.344 7.992 7.992 0 010-11.306l22.63-22.618a7.994 7.994 0 0111.308 0 7.994 7.994 0 010 11.308l-22.632 22.616a7.964 7.964 0 01-5.652 2.344zm45.246 45.23a7.972 7.972 0 01-5.654-2.344 7.992 7.992 0 010-11.306l22.616-22.616a7.994 7.994 0 0111.308 0 7.992 7.992 0 010 11.306l-22.616 22.616a7.964 7.964 0 01-5.654 2.344z"></path>
      <path d="M652.8 253.704a7.976 7.976 0 01-5.654-2.344l-45.23-45.23a7.994 7.994 0 010-11.308 7.994 7.994 0 0111.308 0l45.23 45.232a7.992 7.992 0 010 11.306 7.968 7.968 0 01-5.654 2.344zm-431.396 428.07a7.07 7.07 0 01-1.376-.124 7.966 7.966 0 01-6.308-5.654l-8.154-28.3-28.3-8.152a7.966 7.966 0 01-5.654-6.326 7.986 7.986 0 013.202-7.856l25.254-18.164.406-30.364a7.978 7.978 0 014.436-7.042 7.988 7.988 0 018.294.718l23.584 17.336 28.784-10.402a8.018 8.018 0 018.372 1.876 8.024 8.024 0 011.874 8.372l-10.402 28.786 17.352 23.616a7.992 7.992 0 01.704 8.292 7.972 7.972 0 01-7.044 4.436l-30.346.39-18.196 25.238a7.988 7.988 0 01-6.482 3.324zm-23.88-53.042l16.728 4.81a8.012 8.012 0 015.466 5.466l4.81 16.742 10.934-15.166a7.952 7.952 0 016.374-3.326l18.834-.232-10.666-14.528a7.988 7.988 0 01-1.078-7.45l6.06-16.774-16.774 6.058a8 8 0 01-7.45-1.092l-14.494-10.652-.25 18.852a8 8 0 01-3.326 6.388l-15.168 10.904zM534.21 406.514c-.234.172-25.568.368-56.696-30.77-30.3-30.306-30.346-55.304-30.332-56.358a8.002 8.002 0 017.998-7.896h.094a8.004 8.004 0 017.902 8.006c.016.608.828 20.116 25.646 44.942 25.192 25.184 45.34 26.074 45.528 26.082 4.388.132 7.886 3.764 7.808 8.146a7.952 7.952 0 01-7.948 7.848z"></path>
      <path d="M524.324 371.278a7.954 7.954 0 01-4.67-1.506 157.908 157.908 0 01-19.304-16.424 156.792 156.792 0 01-16.446-19.32 8 8 0 011.828-11.158 7.992 7.992 0 0111.168 1.818 140.146 140.146 0 0014.758 17.346 141.206 141.206 0 0017.336 14.76 7.984 7.984 0 011.812 11.166 7.974 7.974 0 01-6.482 3.318zM675.432 140.61a7.994 7.994 0 01-5.652-13.65L794.164 2.56a7.992 7.992 0 0111.306 0 7.992 7.992 0 010 11.306L681.086 138.268a7.974 7.974 0 01-5.654 2.342z"></path>
      <path d="M845.048 61.448a7.98 7.98 0 01-5.654-2.342l-45.23-45.24a7.992 7.992 0 010-11.306 7.992 7.992 0 0111.306 0l45.232 45.238a7.994 7.994 0 01-5.654 13.65z"></path>
      <path d="M720.664 185.848a7.994 7.994 0 01-5.654-13.65l124.384-124.4a7.994 7.994 0 0111.308 0 7.994 7.994 0 010 11.308l-124.384 124.4a7.98 7.98 0 01-5.654 2.342z"></path>
      <path d="M765.894 140.61a7.98 7.98 0 01-5.654-2.342l-45.23-45.24a7.992 7.992 0 010-11.306 7.994 7.994 0 0111.308 0l45.23 45.238a7.994 7.994 0 01-5.654 13.65zM404.016 615.582a7.972 7.972 0 01-5.654-2.344 7.992 7.992 0 010-11.306c43.232-43.232 82.34-181.712 82.73-183.112 1.188-4.232 5.608-6.714 9.856-5.544a8 8 0 015.544 9.856c-1.64 5.858-40.64 143.924-86.824 190.108a7.974 7.974 0 01-5.652 2.342zM211.752 807.846a7.972 7.972 0 01-5.654-2.344 7.992 7.992 0 010-11.306l45.232-45.232a7.994 7.994 0 0111.308 0 7.994 7.994 0 010 11.308l-45.23 45.23a7.98 7.98 0 01-5.656 2.344zM245.676 457.274a7.972 7.972 0 01-5.654-2.344 7.992 7.992 0 010-11.306c46.184-46.214 184.266-85.214 190.124-86.854 4.264-1.242 8.668 1.302 9.856 5.542a8 8 0 01-5.544 9.856c-1.39.39-139.894 39.508-183.126 82.762a7.984 7.984 0 01-5.656 2.344zM53.428 649.506a7.972 7.972 0 01-5.654-2.344 7.992 7.992 0 010-11.306l45.248-45.232a7.992 7.992 0 0111.306 0 7.994 7.994 0 010 11.308l-45.246 45.23a7.972 7.972 0 01-5.654 2.344zM664.11 197.156a7.972 7.972 0 01-5.654-2.344 7.992 7.992 0 010-11.306l56.554-56.546a7.994 7.994 0 0111.308 0 7.994 7.994 0 010 11.308l-56.554 56.544a7.966 7.966 0 01-5.654 2.344zM840.348 687.926c-4.42 0-8.074-3.576-8.074-7.996s3.498-7.996 7.902-7.996h.172a8 8 0 017.996 7.996 8 8 0 01-7.996 7.996z"></path>
      <path d="M892.248 789.882c-16.776 0-35.89-9.34-52.542-26.004-20.224-20.242-34.346-48.246-39.732-78.858l-25.006-141.752 15.744-2.782 25.004 141.754c4.842 27.426 17.368 52.398 35.296 70.328 15.198 15.212 32.786 23.164 45.748 20.946 13.026-2.296 26.754-15.836 35.844-35.328 10.714-22.976 13.948-50.73 9.122-78.156L916.72 518.28l15.744-2.78 25.006 141.752c5.402 30.626 1.716 61.772-10.372 87.682-11.434 24.538-29.208 41.108-47.558 44.326-2.372.42-4.81.622-7.292.622zm39.216 188.516a8.006 8.006 0 01-7.856-6.606L895.84 814.28a7.992 7.992 0 016.482-9.262c4.294-.874 8.48 2.124 9.262 6.482l27.77 157.512a7.992 7.992 0 01-6.482 9.262 7.13 7.13 0 01-1.408.124zm-73.186 45.388a8.004 8.004 0 01-7.856-6.606 7.99 7.99 0 016.48-9.262l157.498-27.77c4.278-.844 8.496 2.124 9.262 6.48a7.994 7.994 0 01-6.482 9.262l-157.496 27.77a7.126 7.126 0 01-1.406.126z"></path>
      <path d="M889.794 1018.226a7.96 7.96 0 01-5.778-2.468 7.994 7.994 0 01.25-11.308l41.684-39.826c3.204-3.06 8.28-2.936 11.308.25a7.99 7.99 0 01-.25 11.306l-41.686 39.828a7.954 7.954 0 01-5.528 2.218z"></path>
      <path d="M984.288 1001.56a8.054 8.054 0 01-3.216-.672l-52.806-23.162a8.012 8.012 0 01-4.108-10.542c1.764-4.044 6.53-5.84 10.542-4.108l52.806 23.162a8.012 8.012 0 014.108 10.542 7.99 7.99 0 01-7.326 4.78zM782.824 549.876a8.004 8.004 0 01-7.856-6.606 7.99 7.99 0 016.482-9.262l141.752-24.99c4.232-.79 8.48 2.124 9.262 6.482a7.996 7.996 0 01-6.482 9.262L784.23 549.75a7.112 7.112 0 01-1.406.126zm162.056 90.072H798.724a7.992 7.992 0 01-7.996-7.998 7.992 7.992 0 017.996-7.996H944.88a7.992 7.992 0 017.998 7.996 7.992 7.992 0 01-7.998 7.998zM616.442 687.926c-4.42 0-8.074-3.576-8.074-7.996s3.498-7.996 7.902-7.996h.172a8 8 0 017.996 7.996 8 8 0 01-7.996 7.996zm15.994 31.988c-4.422 0-8.076-3.578-8.076-7.998s3.498-7.996 7.904-7.996h.172a8 8 0 017.996 7.996 8.002 8.002 0 01-7.996 7.998z"></path>
      <path d="M650.49 789.882a41.83 41.83 0 01-7.294-.624c-18.352-3.218-36.124-19.79-47.556-44.326-12.09-25.91-15.776-57.054-10.372-87.682l25.004-141.752 15.744 2.78L601.01 660.03c-4.824 27.426-1.592 55.18 9.122 78.156 9.09 19.492 22.82 33.032 35.846 35.328 12.994 2.204 30.548-5.732 45.746-20.946 17.93-17.93 30.456-42.902 35.296-70.328l25.006-141.754 15.742 2.782-25.004 141.752c-5.388 30.612-19.508 58.616-39.734 78.858-16.65 16.664-35.766 26.004-52.54 26.004zm-39.218 188.516a7.992 7.992 0 01-7.886-9.386l27.77-157.512c.766-4.358 4.998-7.356 9.262-6.482a7.992 7.992 0 016.48 9.262l-27.77 157.514a8.006 8.006 0 01-7.856 6.604zm73.186 45.388c-.468 0-.936-.032-1.404-.124l-157.498-27.77c-4.34-.766-7.246-4.904-6.48-9.262s4.998-7.308 9.262-6.48l157.496 27.77a7.994 7.994 0 01-1.376 15.866z"></path>
      <path d="M652.942 1018.226a7.976 7.976 0 01-5.53-2.218l-41.686-39.828a7.992 7.992 0 01-.248-11.306 7.994 7.994 0 0111.306-.25l41.686 39.826a7.996 7.996 0 01-5.528 13.776z"></path>
      <path d="M558.452 1001.56a7.988 7.988 0 01-7.326-4.78 8.012 8.012 0 014.108-10.542l52.806-23.162c4.044-1.732 8.778.062 10.542 4.108a8.01 8.01 0 01-4.106 10.542l-52.806 23.162a8.086 8.086 0 01-3.218.672zm201.46-451.684c-.468 0-.938-.032-1.406-.124l-141.752-24.988a7.998 7.998 0 01-6.482-9.262c.766-4.36 4.982-7.264 9.262-6.482l141.754 24.99a7.99 7.99 0 016.48 9.262 8.004 8.004 0 01-7.856 6.604zM749.65 607.96H603.494c-4.42 0-7.996-3.578-7.996-7.998s3.576-7.996 7.996-7.996H749.65c4.422 0 7.998 3.576 7.998 7.996s-3.576 7.998-7.998 7.998z"></path>
    </svg>
  );
}

export default Event;